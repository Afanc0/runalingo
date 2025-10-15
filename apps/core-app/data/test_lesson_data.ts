"use client"

import { useEffect, useState } from "react";

interface Unit {
    unitNumber: string
    unitName: string
    numberOfLessons: number
}

export const useFetchUnit = () => {
    const [data, setData] = useState<Unit | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUnit = async () => {
            try {
                // Simulated async fetch
                const result = await new Promise<Unit>((resolve) =>
                    setTimeout(
                    () =>
                        resolve({
                            unitNumber: "UNIT 1",
                            unitName: "Basic Numbers and Vocabulary",
                            numberOfLessons: 4,
                        }),
                    500
                    )
                );

                setData(result);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError("Failed to fetch unit",);
            } finally {
                setLoading(false);
            }
        };

        fetchUnit();
    }, []);

    return { data, loading, error };
};