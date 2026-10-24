export interface FSTokens {

		//spacing steps. use for styling padding, margins, gaps.
	'space3xs': string;
	'space2xs': string;
	'spaceXs': string;
	'spaceSm': string;
	'spaceBs': string;
	'spaceLg': string;
	'spaceXl': string;
	'space2xl': string;
	'space3xl': string;
	'space4xl': string;
	'space5xl': string;

	//text scaling steps. in web can use clamped values, but needs fixed values in cases like GPUI apps
	'textXs': string;
	'textSm': string;
	'textBs': string;
	'textLg': string;
	'textXl': string;
	'text2xl': string;
	'text3xl': string;
	'text4xl': string;
	'text5xl': string;

	//the stepped scale from 3xs to 5xl extends its ranges to some other tokens, like border-radius:
	'brXs': string;
	'brSm': string;
	'brMd': string;
	'brBs': string;
	'brLg': string;
	'brFull': string;

	//and to height:
	'hXs': string;
	'hSm': string;
	'hBs': string;
	'hLg': string;
	'hXl': string;

	//speed or duration
	'speedXs': string;
	'speedSm':string;
	'speedBs':string;
	'speedLg':string;
	'speedXl':string;

	//motion
	'transinXs':string;
	'transinSm':string;
	'transinBs':string;
	'transinLg':string;
	'transoutXs':string;
	'transoutSm':string;
	'transoutBs':string;
	'transoutLg':string;

	//z index shorthands
	'z100':number;
	'z300':number;
	'z500':number;
	'z800':number;
	'z999':number;

	//for a stepping scale to box shadows. 
	'shadowXs':string;
	'shadowSm':string;
	'shadowBs':string;
	'shadowLg':string;
	'shadowXl':string;
	'shadow2xl':string;
	'shadow3xl':string;

	//height and width utilities for layout management
	'headerHeight':string;
	'footerHeight':string;
	'appInline':string;
	'cardMin':string;
	'sidebarWidthLeft':string;
	'sidebarWidthRight':string;
	'proseClamp': string;
}

export type FSToken = FSTokens
