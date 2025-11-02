import { getRunningTime } from "@/ts/lib"
import { useEffect, useState } from "react"
import type { JSX } from "react/jsx-runtime"

export default function App(): JSX.Element {
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setDuration(getRunningTime())
        }, 1_000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div>
            <h1>Hello from App Component!</h1>
            <p>The program has been running for {duration} seconds.</p>
        </div>
    )
}
