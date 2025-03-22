import React, { useEffect, useMemo, useRef, useState } from 'react';
import TinderCard from 'react-tinder-card';
import { useWikiArticles } from '../../hooks/useWikiArticles';
import './style.css';
import type { Direction } from '../../interfaces';
import Cancel from '../../components/icons/Cancel';
import Fav from '../../components/icons/Fav';
import Back from '../../components/icons/Back';
import { LanguageSelector } from '../../components/LanguageSelector';

const Section = (props: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="bg-[#121212] w-full p-8 rounded-xl text-left mt-10">
      <div className="text-slate-400 text-lg font-bold text">{props.title}</div>
      <div className="text-white text-lg font-bold break-words">{props.children}</div>
    </div>
  );
};

const formatDate = (d: string | Date) => {
  d = new Date(d);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

const Page = () => {
  const { articles, loading, fetchArticles, setArticles } = useWikiArticles();
  const [currentIndex, setCurrentIndex] = useState(-1);
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    setCurrentIndex(articles.length - 1);
  }, [articles]);

  useEffect(() => {
    if (currentIndex < 0) {
      setArticles([]);
      fetchArticles();
    }
  }, [currentIndex]);

  const childRefs = useMemo(
    () =>
      Array(articles.length)
        .fill(0)
        .map(() => React.createRef()),
    [],
  ) as any;

  const canGoBack = currentIndex < articles.length - 1;
  // const canSwipe = currentIndex >= 0;

  const swiped = (direction: Direction, nameToDelete: string, index: number) => {
    console.log({ direction, nameToDelete, index });
    const value = index - 1;
    setCurrentIndex(value);
    currentIndexRef.current = value;
  };

  const outOfFrame = (_: string, idx: number) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir: string) => {
    await childRefs[currentIndex].current.swipe(dir);
    window.open(articles[currentIndex].url, '_blank')
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div className="bg-slate max-w-2xl">
      <div className="cardContainer w-full h-[85svh]">
        {articles.map((article, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="w-full max-w-2xl h-[85svh] absolute"
            key={article.title}
            onSwipe={(dir) => swiped(dir, article.title, index)}
            onCardLeftScreen={() => outOfFrame(article.title, index)}
          >
            <div
              style={{ backgroundImage: 'url(' + article.thumbnail.source + ')' }}
              className={`card w-full max-w-2xl h-[85svh] bg-white rounded-xl`}
            >
              <div className="card-title text-white text-xl absolute bottom-px ml-5 font-bold">{article.title}</div>
            </div>
          </TinderCard>
        ))}
      </div>
      {!loading && (
        <div className="buttons fixed bottom-10 flex flex-wrap w-full max-w-2xl justify-center">
          <Cancel onClick={() => swipe('left')} />
          <Back onClick={() => goBack()} />
          <Fav onClick={() => swipe('right')} />
        </div>
      )}
      {currentIndex > 0 && (
        <>
          <Section title="about me">{articles[currentIndex].extract}</Section>
          <Section title="link">
            <a
              href={articles[currentIndex].url}
              className="bg-slate-100 whitespace-pre-line"
              target="_blank"
              rel="noreferrer"
            >
              <pre className="whitespace-pre-wrap whitespace-break-spaces">{articles[currentIndex].url}</pre>
            </a>
          </Section>
          <Section title="last updated">{formatDate(articles[currentIndex].touched)}</Section>
          <Section title="settings">
            <LanguageSelector />
          </Section>
        </>
      )}
    </div>
  );
};
export default Page;
