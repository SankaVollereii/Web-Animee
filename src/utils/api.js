const API_BASE_URL = "https://api-kura.animez.my.id/api";

/**
 * Fetch data from the given endpoint
 * @param {string} endpoint - API endpoint (e.g., "home" or "ongoing")
 * @param {number} [page] - Optional page number for pagination
 * @returns {Promise<object>} - Fetched JSON data
 */
export async function fetchData(endpoint, page = null) {
  try {
    const url = page
      ? `${API_BASE_URL}/${endpoint}?page=${page}`
      : `${API_BASE_URL}/${endpoint}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

/**
 * Fetch search results based on a query.
 * @param {string} query - The search query.
 * @returns {Promise<object>} - Fetched JSON data (object containing a 'results' array).
 */
export async function fetchSearchData(query) { // Hapus parameter 'page' jika API search Anda tidak menggunakannya
  try {
    if (!query) {
      console.warn("Search query is empty.");
      return { results: [] }; // Mengembalikan objek dengan array kosong jika query kosong
    }
    // URL sudah terbukti benar dari tes Anda
    const url = `${API_BASE_URL}/search?q=${encodeURIComponent(query)}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`API search failed with status: ${response.status}`);
    }
    const data = await response.json();
    return data; // API Anda langsung mengembalikan objek { results: [...], pagination: [...] }
  } catch (error) {
    console.error("Error fetching search data:", error);
    return { results: [] }; // Mengembalikan objek dengan array kosong jika ada error
  }
}

/**
 * Fetch anime data by ID and slug.
 * @param {string} id - Anime ID.
 * @param {string} slug - Anime slug.
 * @returns {Promise<object|null>}
 */
export async function fetchAnimeData(id, slug) {
  try {
    const url = `${API_BASE_URL}/anime?id=${id}&slug=${slug}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Anime not found");
    return await response.json();
  } catch (error) {
    console.error("Error fetching anime data:", error);
    return null;
  }
}

/**
 * Fetch watch data (video dan navigasi) untuk episode tertentu.
 * @param {string} id - Anime ID.
 * @param {string} slug - Anime slug.
 * @param {number|string} episode - Episode number.
 * @returns {Promise<object|null>}
 */
export async function fetchWatchData(id, slug, episode) {
  try {
    const url = `${API_BASE_URL}/watch?id=${id}&slug=${slug}&episode=${episode}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Video not found");
    return await response.json();
  } catch (error) {
    console.error("Error fetching watch data:", error);
    return null;
  }
}
