
import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
    {
        id: 1,
        date: "2026-05-03",
        meetingType: "regular",
        presiding: "Bishop John Smith",
        conducting: "Brother Michael Brown",
        announcements: ["Ward activity next Saturday"],
        openingHymn: { number: 2, title: "The Spirit of God" },
        openingPrayer: "Sister Mary Johnson",
        wardBusiness: [{ description: "Sustain new ward callings" }],
        stakeBusiness: false,
        sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
        speakers: [
            { name: "David Wilson", topic: "Faith in Jesus Christ", type: "speaker" },
            { name: "Emily Davis", topic: "Following the Savior", type: "speaker" },
        ],
        closingHymn: { number: 134, title: "I Believe in Christ" },
        closingPrayer: "Brother James Taylor",
    },
    {
        id: 2,
        date: "2026-05-10",
        meetingType: "testimony",
        presiding: "Bishop John Smith",
        conducting: "Brother Robert Miller",
        openingHymn: { number: 19, title: "We Thank Thee, O God, for a Prophet" },
        openingPrayer: "Sister Anna White",
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 195, title: "How Great the Wisdom and the Love" },
        speakers: [
            { name: "Ward Members", topic: "Personal Testimonies", type: "speaker" },
        ],
        closingHymn: { number: 89, title: "The Lord Is My Light" },
        closingPrayer: "Brother Peter Clark",
    },
    {
        id: 3,
        date: "2026-05-17",
        meetingType: "regular",
        presiding: "Bishop John Smith",
        conducting: "Brother Michael Brown",
        announcements: ["Youth activity on Wednesday"],
        openingHymn: { number: 3, title: "Now Let Us Rejoice" },
        openingPrayer: "Brother Daniel Lee",
        wardBusiness: [{ description: "Ward conference announcement" }],
        stakeBusiness: true,
        sacramentHymn: { number: 174, title: "While of These Emblems We Partake" },
        speakers: [
            { name: "Sarah Anderson", topic: "The Power of Prayer", type: "speaker" },
            { name: "Mark Thomas", topic: "Service and Discipleship", type: "speaker" },
        ],
        closingHymn: { number: 85, title: "How Firm a Foundation" },
        closingPrayer: "Sister Laura Green",
    },
    {
        id: 4,
        date: "2026-05-24",
        meetingType: "stake",
        presiding: "Stake President David Harris",
        conducting: "Bishop John Smith",
        openingHymn: { number: 27, title: "Praise to the Man" },
        openingPrayer: "Brother William Scott",
        wardBusiness: [],
        stakeBusiness: true,
        sacramentHymn: { number: 181, title: "Jesus of Nazareth, Savior and King" },
        speakers: [
            { name: "President David Harris", topic: "Strengthening Our Faith", type: "speaker" },
            { name: "Sister Rachel Adams", topic: "Serving One Another", type: "speaker" },
        ],
        closingHymn: { number: 152, title: "God Be with You Till We Meet Again" },
        closingPrayer: "Brother Thomas King",
    },
    {
        id: 5,
        date: "2026-05-31",
        meetingType: "general",
        presiding: "President Russell M. Nelson",
        conducting: "Elder Jeffrey R. Holland",
        openingHymn: { number: 1, title: "The Morning Breaks" },
        openingPrayer: "Elder Dieter F. Uchtdorf",
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 188, title: "Thy Will, O Lord, Be Done" },
        speakers: [
            { name: "Conference Speaker", topic: "The Love of God", type: "speaker" },
            { name: "Choir", topic: "Musical Number", type: "musical-number" },
        ],
        closingHymn: { number: 5, title: "High on the Mountain Top" },
        closingPrayer: "Elder David A. Bednar",
    },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
    if (!date) {
        return meetings;
    }

    return meetings.filter((meeting) => meeting.date === date);
}

export function getMeetingById(id: number): SacramentMeeting | null {
    return meetings.find((meeting) => meeting.id === id) ?? null;
}
