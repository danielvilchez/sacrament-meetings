
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const parsed = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(1),
                    })
                    .safeParse(credentials);

                if (!parsed.success) return null;

                const adminEmail = process.env.AUTH_ADMIN_EMAIL;
                const passwordHash = process.env.AUTH_ADMIN_PASSWORD_HASH;

                if (!adminEmail || !passwordHash) return null;

                if (parsed.data.email.toLowerCase() !== adminEmail.toLowerCase()) {
                    return null;
                }

                const passwordIsValid = await bcrypt.compare(
                    parsed.data.password,
                    passwordHash
                );

                if (!passwordIsValid) return null;

                return {
                    id: "bishopric-admin",
                    name: "Bishopric Administrator",
                    email: adminEmail,
                };
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
});
