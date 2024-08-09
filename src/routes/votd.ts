import { Request, Response, NextFunction } from 'express';
import { getVotd } from '../utils';

const VOTDRoute = async (req: Request, res: Response, next: NextFunction) => {
	const {
		verseTitleEN,
		versePassageEN,
		verseVersionEN,
		versePassageZN,
		verseTitleZN,
		verseVersionZN,
	} = await getVotd();

	return res.send({
		en: {
			bookname: verseTitleEN.split('|')[0],
			chapter: verseTitleEN.split('|')[1].split(':')[0],
			startverse: verseTitleEN.split('|')[1].split(':')[1].split('-')[0],
			endverse: verseTitleEN.split('|')[1].split(':')[1].split('-')[1] ?? null,
			content: versePassageEN,
			version: verseVersionEN
				.replaceAll('\n', '')
				.trim()
				// .replaceAll(' ', '')
				.replaceAll('(', '')
				.replaceAll(')', ''),
		},
		zh: {
			bookname: verseTitleZN.split('|')[0],
			chapter: verseTitleZN.split('|')[1].split(':')[0],
			startverse: verseTitleZN.split('|')[1].split(':')[1].split('-')[0],
			endverse: verseTitleZN.split('|')[1].split(':')[1].split('-')[1] ?? null,
			content: versePassageZN,
			version: verseVersionZN
				.replaceAll('\n', '')
				.trim()
				// .replaceAll(' ', '')
				.replaceAll('(', '')
				.replaceAll(')', ''),
		},
	});
};

export default VOTDRoute;
