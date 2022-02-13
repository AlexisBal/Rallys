export async function getRallyeData () {
  const url = "https://ipfs.io/ipfs/QmayhmJPSrGJekJX4Q4AnGJ3AL28ZLkf8R9S57XieoRbpZ";
  try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        return console.error(error);
    }
}