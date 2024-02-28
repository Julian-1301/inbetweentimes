export async function addGameObject(GameObjectFormResult: any): Promise<boolean> {
    await GameObjectFormResult;

    try {
        const response: Response = await fetch(`${viteConfiguration.API_URL}gameobject/add`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(GameObjectFormResult),
        });

        if (response.ok) {
            return true;
        } else {
            console.error("Error:", response.statusText);
            return false;
        }
    } catch (error) {
        console.error("Fetch error:", error);
        return false;
    }
}



