interface Payload<TVariables> {
    query: string;
    variables?: TVariables;
}

interface Error {
    message: string;
}

export const server = {
    fetch: async <TData = any, TVariables = any>(payload: Payload<TVariables>) => {
        console.log(payload, 'Our Payload');
        const response = await fetch("/orchard", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error("failed to fetch from server");
        }

        return response.json() as Promise<{
            data: TData;
            errors: Error[];
          }>;
    }
};