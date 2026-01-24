import natural from "natural";

const TfIdf = natural.TfIdf;

/**
 * Manual cosine similarity
 */
function cosineSimilarity(vecA, vecB) {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  const terms = new Set([
    ...Object.keys(vecA),
    ...Object.keys(vecB),
  ]);

  for (const term of terms) {
    const a = vecA[term] || 0;
    const b = vecB[term] || 0;

    dot += a * b;
    normA += a * a;
    normB += b * b;
  }

  if (normA === 0 || normB === 0) return 0;

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export const rankVideosTFIDF = (videos, query) => {
  if (!videos || videos.length === 0) return [];

  const tfidf = new TfIdf();

  // Add video documents
  videos.forEach(video => {
    tfidf.addDocument(
      `${video.title} ${video.description} ${video.transcript || ""}`
    );
  });

  // Add query as last document
  tfidf.addDocument(query);
  const queryIndex = videos.length;

  // Build query vector
  const queryVector = {};
  tfidf.listTerms(queryIndex).forEach(term => {
    queryVector[term.term] = term.tfidf;
  });

  const ranked = videos.map((video, index) => {
    const docVector = {};
    tfidf.listTerms(index).forEach(term => {
      docVector[term.term] = term.tfidf;
    });

    const score = cosineSimilarity(queryVector, docVector);

    return {
      ...video,
      relevanceScore: Number(score.toFixed(4)),
    };
  });

  return ranked.sort((a, b) => b.relevanceScore - a.relevanceScore);
};
