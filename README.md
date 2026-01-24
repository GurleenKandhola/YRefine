YRefine is a full-stack YouTube search enhancement project that improves the relevance of YouTube search results using NLP techniques, transcript analysis, and AI-based ranking.

Instead of relying only on YouTube’s default ranking, YRefine fetches video metadata and transcripts, computes relevance scores, and ranks videos using TF-IDF and cosine similarity.

1. Core Features

    Custom YouTube search using YouTube Data API

    Relevance-based video ranking

    AI/NLP-powered ranking using:

        TF-IDF vectorization

        Cosine similarity

    Transcript-based relevance analysis

    Debounced search (optimized API usage)

    Relevance score displayed on frontend

2.Advanced Enhancements

    Graceful handling of missing transcripts

    Backend modular architecture

    Clean REST API design


3. Tech Stack
    Frontend

        React (Vite)

        JavaScript (ES6+)

        Fetch API

        CSS

    Backend

        Node.js

        Express.js

        YouTube Data API v3

        Axios

        NLP utilities (TF-IDF, cosine similarity)

4. Tools & Concepts

    REST APIs

    NLP (TF-IDF, cosine similarity)

    Debouncing

    Git & GitHub

    Modular backend architecture

5. Project Structure
YYRefine/
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx
│   │   │   └── VideoList.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/
│   │   │   └── searchController.js
│   │   ├── routes/
│   │   │   └── searchRoutes.js
│   │   ├── utils/
│   │   │   ├── rankVideos.js
│   │   │   ├── rankVideosTFIDF.js
│   │   │   └── getTranscript.js
│   │   ├── app.js
│   │   └── server.js
│
├── README.md
└── .gitignore

6. How It Works

    User enters a search query in the frontend

    Frontend sends request to backend (/api/search)

    Backend:

        Fetches videos from YouTube API

        Retrieves transcripts (when available)

        Converts text into TF-IDF vectors

        Calculates cosine similarity with query

        Ranks videos by relevance score

    Ranked results are sent back to frontend

    Frontend displays videos with relevance score

7. AI / ML Concepts Used
    TF-IDF (Term Frequency–Inverse Document Frequency)

        Measures how important a word is in a document relative to others

        Helps reduce noise from common words

    Cosine Similarity

        Measures similarity between query and video text vectors

        Produces a relevance score between 0 and 1

8. Local Setup Instructions
    1. Clone the repository
git clone https://github.com/GurleenKandhola/YRefine.git
cd YRefine

    2. Backend Setup
        cd server
        npm install


        Create a .env file:

            YOUTUBE_API_KEY=your_api_key_here
            PORT=5000


        Run backend:

            npm run dev

    3. Frontend Setup
        cd ../client
        npm install
        npm run dev

    4. Open in browser
        http://localhost:5173

    System Requirements

        Node.js v20+

        RAM: 4GB sufficient (project optimized for low-resource machines)

        Internet connection (YouTube API)

9. Known Limitations

    Some videos do not provide transcripts

    YouTube API quota limits apply

    Ranking is NLP-based (not deep learning)

10. Future Improvements

    Transcript caching with Redis

    Transformer-based embeddings

    User-based personalization

    Deployment (Render + Netlify)

    Analytics dashboard

Author

Gurleen Kaur
Computer Science Engineer
