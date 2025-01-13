export async function fetchWorkersData() {
    try {
        const reponse = await fetch("https://67701d46b353db80c3246245.mockapi.io/listUser/workers");
        return await reponse.json();

    } catch (error) {
        console.log(`fetchWorkerData Error: ${error}`);
    }
}
