import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export const instant = false;

export const metadata = {
    title: "Sign In | Sacrament Meeting Planner",
    description: "Sign in to manage sacrament meetings.",
};

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
    const params = await searchParams;

    async function authenticate(formData: FormData) {
        "use server";

        try {
            await signIn("credentials", formData);
        } catch (error) {
            if (error instanceof AuthError) {
                redirect("/login?error=CredentialsSignin");
            }

            throw error;
        }
    }

    return (
        <main className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center px-6 py-12">
            <div className="w-full rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
                <h1 className="mb-2 text-2xl font-bold text-gray-900">
                    Administrator Login
                </h1>

                <p className="mb-6 text-sm text-gray-600">
                    Sign in to manage sacrament meeting schedules.
                </p>

                {params.error && (
                    <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
                        Invalid email or password. Please try again.
                    </p>
                )}

                <form action={authenticate} className="space-y-5">
                    <input
                        type="hidden"
                        name="redirectTo"
                        value={params.callbackUrl || "/meetings"}
                    />

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="username"
                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </main>
    );
}
