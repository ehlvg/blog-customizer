export type TSpacing = '4px' | '24px' | '50px' | '90px' | '207px';

export const Spacing = ({ spacing }: { spacing: TSpacing }) => {
	return <div style={{ padding: `calc(${spacing} / 2)` }} />;
};
