import { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'
import * as cheerio from 'cheerio'

// Define the structure of the response data
interface UserInfo {
  username: string
  submission_count: string
  first_submission: string
  last_submission: string
}

interface LanguageData {
  language: string
  number_of_submissions: string
  share: string
}

interface ScrapedData {
  user_info: UserInfo
  languages: LanguageData[]
}

interface ErrorResponse {
  error: string
  details?: string
}

// API handler
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  const { userId } = req.query

  // Validate the userId parameter
  if (!userId || typeof userId !== 'string') {
    res
      .status(400)
      .json({ error: 'Missing or invalid userId parameter in the URL' })
    return
  }

  try {
    // Fetch the user's profile page
    const url = `https://cses.fi/user/${userId}`
    const response = await axios.get(url)
    const html = response.data
    const $ = cheerio.load(html)

    // Extract the username from the title block
    const username = $('.title-block h1').text().replace('User ', '').trim()

    // Extract user information
    const userInfo: UserInfo = {
      username,
      submission_count: '',
      first_submission: '',
      last_submission: '',
    }

    $('.summary-table.narrow tr').each((_, row) => {
      const key = $(row)
        .find('td')
        .first()
        .text()
        .trim()
        .replace(':', '')
        .toLowerCase()
        .replace(' ', '_') as keyof UserInfo
      const value = $(row).find('td').last().text().trim()
      if (key in userInfo) {
        userInfo[key] = value
      }
    })

    // Extract languages data
    const languages: LanguageData[] = []
    $('.narrow tbody tr').each((_, row) => {
      const languageData: LanguageData = {
        language: '',
        number_of_submissions: '',
        share: '',
      }
      $(row)
        .find('td')
        .each((index, cell) => {
          if (index === 0) languageData.language = $(cell).text().trim()
          else if (index === 1)
            languageData.number_of_submissions = $(cell).text().trim()
          else if (index === 2) languageData.share = $(cell).text().trim()
        })
      if (languageData.language) {
        languages.push(languageData)
      }
    })

    // Combine the scraped data into a single object
    const scrapedData: ScrapedData = {
      user_info: userInfo,
      languages,
    }

    // Respond with the scraped data
    res.status(200).json(scrapedData)
  } catch (error) {
    const errorResponse: ErrorResponse = {
      error: 'Error scraping data',
      details: (error as Error).message,
    }
    res.status(500).json(errorResponse)
  }
}
