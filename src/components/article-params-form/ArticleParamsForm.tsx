import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text/Text';
import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useState, useEffect, useRef } from 'react';
import { Spacing } from '../spacing';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { saveArticleState } from 'src/index';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	onArticleStateChange: (newState: ArticleStateType) => void;
	onResetArticleState: () => void;
};

export const ArticleParamsForm = ({
	articleState,
	onArticleStateChange,
	onResetArticleState,
}: ArticleParamsFormProps) => {
	const [isArrowButtonOpen, setIsArrowButtonOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isArrowButtonOpen &&
				formRef.current &&
				!formRef.current.contains(event.target as Node)
			) {
				setIsArrowButtonOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isArrowButtonOpen]);

	const [fontOption, setFontOption] = useState(articleState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(articleState.fontSizeOption);
	const [fontColorOption, setFontColorOption] = useState(
		articleState.fontColor
	);
	const [backgroundColorOption, setBackgroundColorOption] = useState(
		articleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(articleState.contentWidth);

	useEffect(() => {
		setFontOption(articleState.fontFamilyOption);
		setFontSize(articleState.fontSizeOption);
		setFontColorOption(articleState.fontColor);
		setBackgroundColorOption(articleState.backgroundColor);
		setContentWidth(articleState.contentWidth);
	}, [articleState]);

	const resetFormData = () => {
		saveArticleState(defaultArticleState);
		onResetArticleState();
	};

	const applyToArticle = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newArticleState: ArticleStateType = {
			fontFamilyOption: fontOption,
			fontSizeOption: fontSize,
			fontColor: fontColorOption,
			backgroundColor: backgroundColorOption,
			contentWidth: contentWidth,
		};

		saveArticleState(newArticleState);
		onArticleStateChange(newArticleState);
	};
	return (
		<div ref={formRef}>
			<ArrowButton
				isOpen={isArrowButtonOpen}
				onClick={() => setIsArrowButtonOpen(!isArrowButtonOpen)}
			/>
			<aside
				className={
					isArrowButtonOpen ? styles.container_open : styles.container
				}>
				<form className={styles.form} onSubmit={applyToArticle}>
					<Text as='h2' size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Spacing spacing='50px' />
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={fontOption}
						onChange={setFontOption}
					/>
					<Spacing spacing='50px' />
					<RadioGroup
						options={fontSizeOptions}
						onChange={setFontSize}
						name='fontSize'
						selected={fontSize}
						title='Размер шрифта'
					/>
					<Spacing spacing='50px' />
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={fontColorOption}
						onChange={setFontColorOption}
					/>
					<Spacing spacing='50px' />
					<Separator />
					<Spacing spacing='50px' />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={backgroundColorOption}
						onChange={setBackgroundColorOption}
					/>
					<Spacing spacing='50px' />
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={contentWidth}
						onChange={setContentWidth}
					/>
					<Spacing spacing='207px' />
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetFormData}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
