
import { ImageResponse } from "next/og";

export const alt = "Sacrament Meeting Planner";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#1e3a8a",
                    color: "white",
                    padding: "60px",
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        fontSize: 34,
                        color: "#bfdbfe",
                        marginBottom: 24,
                    }}
                >
                    SACRAMENT MEETING PLANNER
                </div>

                <div
                    style={{
                        fontSize: 72,
                        fontWeight: 700,
                        lineHeight: 1.1,
                    }}
                >
                    Plan and View
                </div>

                <div
                    style={{
                        fontSize: 72,
                        fontWeight: 700,
                        lineHeight: 1.1,
                        marginBottom: 32,
                    }}
                >
                    Sacrament Meetings
                </div>

                <div
                    style={{
                        fontSize: 28,
                        color: "#dbeafe",
                    }}
                >
                    Meeting schedules, hymns, prayers and speakers
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
