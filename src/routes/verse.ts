import { Request, Response, NextFunction } from 'express';
import { getVotd } from '../utils';

const VerseRoute = async (req: Request, res: Response, next: NextFunction) => {
	const {
		verseTitleEN,
		versePassageEN,
		verseVersionEN,
		versePassageZN,
		verseTitleZN,
		verseVersionZN,
	} = await getVotd();

	return res.send({
		verseTitleEN,
		versePassageEN,
		verseVersionEN: verseVersionEN
			.replaceAll('\n', '')
			.trim()
			// .replaceAll(' ', '')
			.replaceAll('(', '')
			.replaceAll(')', ''),
		verseTitleZN,
		versePassageZN,
		verseVersionZN: verseVersionZN
			.replaceAll('\n', '')
			.trim()
			// .replaceAll(' ', '')
			.replaceAll('(', '')
			.replaceAll(')', ''),
	});
};

export default VerseRoute;
