import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export const ARTICLE_STATE_STORAGE_KEY = 'articleState';

export const saveArticleState = (state: ArticleStateType) => {
	try {
		localStorage.setItem(ARTICLE_STATE_STORAGE_KEY, JSON.stringify(state));
	} catch (error) {
		console.error('Ошибка сохранения:', error);
	}
};

export const loadArticleState = (): ArticleStateType => {
	try {
		const saved = localStorage.getItem(ARTICLE_STATE_STORAGE_KEY);
		if (saved) {
			return JSON.parse(saved);
		}
	} catch (error) {
		console.error('Ошибка загрузки состояния статьи:', error);
	}
	return defaultArticleState;
};

const App = () => {
	const savedState = loadArticleState();
	const [articleState, setArticleState] =
		useState<ArticleStateType>(savedState);

	useEffect(() => {
		const savedState = loadArticleState();
		setArticleState(savedState);
	}, []);

	useEffect(() => {
		saveArticleState(articleState);
	}, [articleState]);

	const handleArticleStateChange = (newState: ArticleStateType) => {
		setArticleState(newState);
	};

	const handleResetArticleState = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleState={articleState}
				onArticleStateChange={handleArticleStateChange}
				onResetArticleState={handleResetArticleState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
