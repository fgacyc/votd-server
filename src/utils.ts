import axios from 'axios';
import cheerio, { Cheerio } from 'cheerio';

export const formatObjectToString = (obj: Record<string, string>): string => {
	return Object.entries(obj)
		.map(([key, value]) => `${key}: ${value}`)
		.join('\n');
};

export const convertTo12Hour = (time24: string) => {
	// Parse the input time
	const [hours, minutes] = time24.split(':').map(Number);

	// Check if the time is in the morning (AM) or afternoon/evening (PM)
	const period = hours >= 12 ? 'PM' : 'AM';

	// Convert to 12-hour format
	let hours12 = hours % 12 || 12;

	// Format the output string
	const time12 = `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;

	return time12;
};

export const getVotd = async (): Promise<{
	verseTitleEN: string;
	versePassageEN: string;
	verseVersionEN: string;
	verseTitleZN: string;
	versePassageZN: string;
	verseVersionZN: string;
}> => {
	const AxiosInstance = axios.create();

	let verseTitleEN = '';
	let versePassageEN = '';
	let verseVersionEN = '';
	let verseTitleZN = '';
	let versePassageZN = '';
	let verseVersionZN = '';

	await AxiosInstance.get('https://www.biblegateway.com/')
		.then(
			// Once we have data returned ...
			async (response) => {
				const html = response.data; // Get the HTML from the HTTP request
				// console.log('data', html);
				const $ = cheerio.load(html);
				//@ts-ignore
				const dailyVerse: Cheerio = $('.passage-box');
				// console.log(dailyVerse);
				//@ts-ignore
				dailyVerse.each(async (i, elem) => {
					verseTitleEN = $(elem).find('.verse-bar > a > span').text();
					// verseTitleEN = 'Songs of Songs 5:17-19';

					let verseTitleENLastSpaceIndex = verseTitleEN.lastIndexOf(' '); // Parse the title

					if (verseTitleENLastSpaceIndex !== -1) {
						verseTitleEN =
							verseTitleEN.substring(0, verseTitleENLastSpaceIndex) +
							'|' +
							verseTitleEN.substring(verseTitleENLastSpaceIndex + 1);
					}
					verseVersionEN = $(elem)
						.find('.verse-bar > a')
						.text()
						.trim()
						.slice(verseTitleEN.length); // Parse the version

					versePassageEN = $(elem).find('#verse-text').text(); // Parse the passage
				});
			},
		)
		.catch((err) => {
			console.error(err);
			return {
				verseTitleEN,
				versePassageEN,
				verseVersionEN,
			};
		});

	// Chinese Ver.
	await AxiosInstance.get('https://www.biblegateway.com/', {
		headers: {
			Cookie: 'BGP_default_version=CNVS;',
		},
		withCredentials: true,
	})
		.then(
			// Once we have data returned ...
			async (response) => {
				const html = response.data; // Get the HTML from the HTTP request
				// console.log('data', html);
				const $ = cheerio.load(html);
				//@ts-ignore
				const dailyVerse: Cheerio = $('.passage-box');
				// console.log(dailyVerse);
				//@ts-ignore
				dailyVerse.each(async (i, elem) => {
					verseTitleZN = $(elem).find('.verse-bar > a > span').text();
					// verseTitleZN = 'Songs of Songs 5:17-19';

					let verseTitleZNLastSpaceIndex = verseTitleZN.lastIndexOf(' '); // Parse the title

					if (verseTitleZNLastSpaceIndex !== -1) {
						verseTitleZN =
							verseTitleZN.substring(0, verseTitleZNLastSpaceIndex) +
							'|' +
							verseTitleZN.substring(verseTitleZNLastSpaceIndex + 1);
					}
					verseVersionZN = $(elem)
						.find('.verse-bar > a')
						.text()
						.trim()
						.slice(verseTitleZN.length); // Parse the version

					versePassageZN = $(elem).find('#verse-text').text(); // Parse the passage
				});
			},
		)
		.catch((err) => {
			console.error(err);
			return {
				verseTitleZN,
				versePassageZN,
				verseVersionZN,
			};
		});

	return {
		verseTitleEN,
		verseTitleZN,
		versePassageEN,
		versePassageZN,
		verseVersionEN,
		verseVersionZN,
	};
};
