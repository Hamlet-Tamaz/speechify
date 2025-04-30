const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<string> => {
    const response = await fetch(url);

    if (!response.ok) {
        // throw new Error(`Error fetching content: ${response.status}`)
        console.log(`Error fetching content: ${response.status}`);
        return "<speak><s>There was an error</s></speak>";
    }

    const {content} = await response.json();

    console.log('fetched content: ', {response, content})

    return content
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {
    const parsed = content
        .replace(/<[^>]*>/g, ':::')
        .split(':::')
        .filter(el => el);

    return parsed;
};

export { fetchContent, parseContentIntoSentences };
