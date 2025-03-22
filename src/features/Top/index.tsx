import React, { useEffect, useMemo, useRef, useState } from 'react';
import TinderCard from 'react-tinder-card';
import { useWikiArticles } from '../../hooks/useWikiArticles';
import './style.css';
import type { Direction } from '../../interfaces';
import Cancel from '../../components/icons/Cancel';
import Fav from '../../components/icons/Fav';
import Back from '../../components/icons/Back';
import { LanguageSelector } from '../../components/LanguageSelector';

interface Article {
  title: string;
  url: string;
  extract: string;
  touched: string;
  thumbnail: {
    source: string;
  };
}

interface SectionProps {
  title: string;
  children?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <div className="bg-[#121212] w-full p-8 rounded-xl text-left mt-10">
      <div className="text-slate-400 text-lg font-bold">{title}</div>
      <div className="text-white text-lg font-bold break-words">{children}</div>
    </div>
  );
};

const formatDate = (d: string | Date): string => {
  const date = new Date(d);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const Page: React.FC = () => {
  const { articles, loading, fetchArticles, setArticles } = useWikiArticles();
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const currentIndexRef = useRef<number>(currentIndex);
  const [error, setError] = useState<string | null>(null);

  // articlesが更新されたときにcurrentIndexを更新
  useEffect(() => {
    setCurrentIndex(articles.length - 1);
    currentIndexRef.current = articles.length - 1;
  }, [articles.length]);

  // 記事がなくなった場合に再取得
  useEffect(() => {
    const loadArticles = async () => {
      if (currentIndex < 0 && !loading) {
        try {
          setArticles([]);
          await fetchArticles();
        } catch (err) {
          setError('Failed to fetch articles');
          console.error(err);
        }
      }
    };
    loadArticles();
  }, [currentIndex, fetchArticles, setArticles, loading]);

  // childRefsをarticlesに依存するように修正
  const childRefs = useMemo(
    () =>
      Array(articles.length)
        .fill(0)
        .map(() => React.createRef<any>()),
    [articles.length],
  );

  const canGoBack = currentIndex < articles.length - 1;

  const swiped = (_direction: Direction, _nameToDelete: string, index: number) => {
    const newIndex = index - 1;
    setCurrentIndex(newIndex);
    currentIndexRef.current = newIndex;
  };

  const outOfFrame = (_name: string, idx: number) => {
    if (currentIndexRef.current >= idx) {
      childRefs[idx].current?.restoreCard();
    }
  };

  const swipe = async (dir: 'left' | 'right') => {
    if (currentIndex >= 0 && childRefs[currentIndex]?.current) {
      try {
        await childRefs[currentIndex].current.swipe(dir);
        if (dir === 'right') {
          window.open(articles[currentIndex].url, '_blank');
        }
      } catch (err) {
        console.error('Swipe failed:', err);
      }
    }
  };

  const goBack = async () => {
    if (!canGoBack || currentIndex >= articles.length - 1) return;
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    currentIndexRef.current = newIndex;
    await childRefs[newIndex].current?.restoreCard();
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-slate max-w-2xl mx-auto">
      <div className="cardContainer w-full h-[85svh] relative">
        {articles.map((article: Article, index: number) => (
          <TinderCard
            ref={childRefs[index]}
            className="w-full max-w-2xl h-[85svh] absolute"
            key={article.title}
            onSwipe={(dir) => swiped(dir, article.title, index)}
            onCardLeftScreen={() => outOfFrame(article.title, index)}
            preventSwipe={['up', 'down']}
          >
            <div
              style={{ backgroundImage: `url(${article.thumbnail?.source})` }}
              className="card w-full max-w-2xl h-[85svh] bg-white rounded-xl bg-cover bg-center"
            >
              <div className="card-title text-white text-xl absolute bottom-1 left-5 font-bold bg-black/50 p-2 rounded">
                {article.title}
              </div>
            </div>
          </TinderCard>
        ))}
      </div>

      {!loading && articles.length > 0 && (
        <div className="buttons fixed bottom-10 left-0 right-0 flex justify-center gap-4">
          <Cancel onClick={() => swipe('left')} />
          <Back onClick={goBack} disabled={!canGoBack} />
          <Fav onClick={() => swipe('right')} />
        </div>
      )}

      {loading && <div className="text-white text-center">Loading...</div>}

      {currentIndex >= 0 && articles[currentIndex] && (
        <>
          <Section title="about me">{articles[currentIndex].extract}</Section>
          <Section title="link">
            <a href={articles[currentIndex].url} className="whitespace-pre-line" target="_blank" rel="noreferrer">
              {articles[currentIndex].title} (link)
            </a>
          </Section>
          <Section title="last updated">{formatDate(articles[currentIndex].touched)}</Section>
          <Section title="settings">
            <div className="w-full flex justify-end">
              <LanguageSelector />
            </div>
          </Section>
        </>
      )}
      <div className="h-20" />
    </div>
  );
};

export default Page;
