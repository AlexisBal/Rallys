export async function getRallyeData (url: string) {
  try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        return console.error(error);
    }
}