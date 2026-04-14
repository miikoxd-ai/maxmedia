import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Lock, Loader2, LogOut, Save, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type EditableContent = {
  heroEyebrow: string;
  heroHeadline: string;
  heroSupportingText: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  servicesTitle: string;
  servicesIntro: string;
  aboutTitle: string;
  aboutBody: string;
  trustPointOne: string;
  trustPointTwo: string;
  trustPointThree: string;
  portfolioTitle: string;
  portfolioIntro: string;
  featuredWorkTitle: string;
  featuredWorkDescription: string;
  instagramPostUrl: string;
  instagramReelOneUrl: string;
  instagramReelTwoUrl: string;
  instagramReelThreeUrl: string;
  contactTitle: string;
  contactIntro: string;
  contactEmail: string;
  contactPhone: string;
  instagramProfileUrl: string;
  footerText: string;
};

const fieldRows: Array<{
  key: keyof EditableContent;
  label: string;
  type?: "text" | "textarea" | "email" | "url";
}> = [
  { key: "heroEyebrow", label: "Hero Eyebrow" },
  { key: "heroHeadline", label: "Hero Headline", type: "textarea" },
  { key: "heroSupportingText", label: "Hero Supporting Text", type: "textarea" },
  { key: "heroPrimaryCta", label: "Primary CTA" },
  { key: "heroSecondaryCta", label: "Secondary CTA" },
  { key: "servicesTitle", label: "Services Title", type: "textarea" },
  { key: "servicesIntro", label: "Services Intro", type: "textarea" },
  { key: "aboutTitle", label: "About Title", type: "textarea" },
  { key: "aboutBody", label: "About Body", type: "textarea" },
  { key: "trustPointOne", label: "Trust Point One" },
  { key: "trustPointTwo", label: "Trust Point Two" },
  { key: "trustPointThree", label: "Trust Point Three" },
  { key: "portfolioTitle", label: "Portfolio Title", type: "textarea" },
  { key: "portfolioIntro", label: "Portfolio Intro", type: "textarea" },
  { key: "featuredWorkTitle", label: "Photo Usage Title" },
  { key: "featuredWorkDescription", label: "Photo Usage Description", type: "textarea" },
  { key: "instagramPostUrl", label: "Instagram Post URL", type: "url" },
  { key: "instagramReelOneUrl", label: "Instagram Reel One URL", type: "url" },
  { key: "instagramReelTwoUrl", label: "Instagram Reel Two URL", type: "url" },
  { key: "instagramReelThreeUrl", label: "Instagram Reel Three URL", type: "url" },
  { key: "contactTitle", label: "Contact Title" },
  { key: "contactIntro", label: "Contact Intro", type: "textarea" },
  { key: "contactEmail", label: "Contact Email", type: "email" },
  { key: "contactPhone", label: "Contact Phone" },
  { key: "instagramProfileUrl", label: "Instagram Profile URL", type: "url" },
  { key: "footerText", label: "Footer Text", type: "textarea" },
];

function AdminLoginCard() {
  const utils = trpc.useUtils();
  const [password, setPassword] = useState("");

  const loginMutation = trpc.auth.adminLogin.useMutation({
    onSuccess: async () => {
      await utils.auth.adminStatus.invalidate();
      await utils.siteContent.getAdmin.invalidate();
      toast.success("Admin access granted.");
      setPassword("");
    },
    onError: (error) => {
      toast.error(error.message || "Incorrect admin password.");
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await loginMutation.mutateAsync({ password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.18),transparent_30%),#050505] px-6 py-12 text-white">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#0f0f13] p-8 shadow-[0_32px_120px_rgba(0,0,0,0.55)]">
        <div className="inline-flex rounded-full border border-red-500/25 bg-red-500/10 p-3 text-red-400">
          <Lock className="h-5 w-5" />
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-red-400">Restricted admin dashboard</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Enter the dashboard password</h1>
        <p className="mt-4 text-sm leading-7 text-zinc-400">
          The public website is view-only. Editing access is limited to the protected admin dashboard and requires the dedicated password.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-200">Admin password</label>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              className="h-12 rounded-2xl border-white/10 bg-black/40 text-white"
              placeholder="Enter dashboard password"
            />
          </div>
          <Button
            type="submit"
            disabled={loginMutation.isPending || password.trim().length === 0}
            className="h-12 w-full rounded-full bg-red-600 text-white hover:bg-red-500"
          >
            {loginMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldCheck className="mr-2 h-4 w-4" />}
            Unlock dashboard
          </Button>
        </form>
      </div>
    </div>
  );
}

function AdminEditor() {
  const utils = trpc.useUtils();
  const { data, isLoading } = trpc.siteContent.getAdmin.useQuery();
  const [form, setForm] = useState<EditableContent | null>(null);

  const updateMutation = trpc.siteContent.update.useMutation({
    onSuccess: async () => {
      await utils.siteContent.getPublic.invalidate();
      await utils.siteContent.getAdmin.invalidate();
      toast.success("Website content saved.");
    },
    onError: (error) => {
      toast.error(error.message || "Could not save changes.");
    },
  });

  const logoutMutation = trpc.auth.adminLogout.useMutation({
    onSuccess: async () => {
      await utils.auth.adminStatus.invalidate();
      await utils.siteContent.getAdmin.invalidate();
      toast.success("Admin session closed.");
    },
  });

  useEffect(() => {
    if (!data) return;
    const { updatedAt: _updatedAt, key: _key, ...rest } = data;
    setForm(rest);
  }, [data]);

  const handleChange = (key: keyof EditableContent, value: string) => {
    setForm((current) => (current ? { ...current, [key]: value } : current));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form) return;
    await updateMutation.mutateAsync(form);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.18),transparent_28%),linear-gradient(180deg,#050505_0%,#0b0b0f_100%)] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-red-400">Max Media admin</p>
            <h1 className="mt-2 text-lg font-semibold">Protected website editor</h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:border-red-500/40 hover:text-white">
              View public site
            </a>
            <Button
              variant="outline"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
              className="rounded-full border-white/10 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              {logoutMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
              Log out
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-10">
        <div className="grid gap-6 xl:grid-cols-[0.35fr_0.65fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-[#0f0f13] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <p className="text-xs uppercase tracking-[0.3em] text-red-400">Access rules</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">This area is not public.</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-zinc-400">
              <p>Visitors on the main website cannot see edit controls or save content changes.</p>
              <p>Only this dashboard can update homepage copy, contact details, and portfolio links.</p>
              <p>Authentication depends on the dedicated admin password rather than general site visitors or standard browsing access.</p>
            </div>
          </aside>

          <section className="rounded-[2rem] border border-white/10 bg-[#101014] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            {isLoading || !form ? (
              <div className="flex min-h-[50vh] items-center justify-center rounded-[1.5rem] border border-white/10 bg-black/40">
                <Loader2 className="h-8 w-8 animate-spin text-red-400" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-red-400">Content editor</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">Edit live website content</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
                    Update messaging here, then save to publish the new copy across the public homepage without exposing editing options to visitors.
                  </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  {fieldRows.map((field) => (
                    <label key={field.key} className={field.type === "textarea" ? "lg:col-span-2" : ""}>
                      <span className="mb-2 block text-sm font-medium text-zinc-200">{field.label}</span>
                      {field.type === "textarea" ? (
                        <Textarea
                          value={form[field.key]}
                          onChange={(event) => handleChange(field.key, event.target.value)}
                          rows={5}
                          className="min-h-[140px] rounded-2xl border-white/10 bg-black/40 text-white"
                        />
                      ) : (
                        <Input
                          type={field.type ?? "text"}
                          value={form[field.key]}
                          onChange={(event) => handleChange(field.key, event.target.value)}
                          className="h-12 rounded-2xl border-white/10 bg-black/40 text-white"
                        />
                      )}
                    </label>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={updateMutation.isPending}
                    className="rounded-full bg-red-600 px-6 text-white hover:bg-red-500"
                  >
                    {updateMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Save changes
                  </Button>
                </div>
              </form>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default function AdminPage() {
  const statusQuery = trpc.auth.adminStatus.useQuery();

  if (statusQuery.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <Loader2 className="h-8 w-8 animate-spin text-red-400" />
      </div>
    );
  }

  if (!statusQuery.data?.authenticated) {
    return <AdminLoginCard />;
  }

  return <AdminEditor />;
}
