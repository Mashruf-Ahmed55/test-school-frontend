import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  BarChart3,
  CheckCircle2,
  FileBadge,
  ShieldCheck,
  Timer,
  WebcamIcon,
} from 'lucide-react';
import { Link } from 'react-router';

export default function App() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="container mx-auto grid items-center gap-8 px-4 py-16 md:grid-cols-2">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            {'Certified A1–C2 competency assessment'}
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {'Assess. Certify. Advance.'}
          </h1>
          <p className="text-lg text-muted-foreground">
            {
              'A secure, 3‑step digital competency platform with per‑question timers, OTP verification, and automated certification.'
            }
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <Link to="/auth/register">{'Get Started'}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/exam/start">{'Take a Demo'}</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge
              variant="secondary"
              className="bg-emerald-50 text-emerald-700"
            >
              {'OTP & JWT'}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-emerald-50 text-emerald-700"
            >
              {'Timer Auto‑Submit'}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-emerald-50 text-emerald-700"
            >
              {'Admin Analytics'}
            </Badge>
          </div>
        </div>
        <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-xl border bg-muted">
          <img
            src="/placeholder.svg?height=600&width=800"
            alt="Secure online exam illustration"
            className="object-cover"
          />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-emerald-50/40 py-12">
        <div className="container mx-auto grid gap-6 px-4 md:grid-cols-3">
          {[
            {
              icon: Timer,
              title: 'Per‑Question Timers',
              desc: 'Configurable countdown with auto‑submit on expiration.',
            },
            {
              icon: WebcamIcon,
              title: 'Integrity Controls',
              desc: 'Browser lock, copy/paste blocking, optional webcam recording.',
            },
            {
              icon: FileBadge,
              title: 'Auto Certification',
              desc: 'Issue level certificates instantly (A1→C2).',
            },
            {
              icon: CheckCircle2,
              title: '3‑Step Progression',
              desc: 'Stepwise evaluation with strict retest policies.',
            },
            {
              icon: ShieldCheck,
              title: 'OTP + JWT Auth',
              desc: 'Email OTP verification and secure sessions.',
            },
            {
              icon: BarChart3,
              title: 'Admin Analytics',
              desc: 'User management, pagination, and insights.',
            },
          ].map((f, i) => (
            <Card key={i} className="border-0 shadow-sm">
              <CardContent className="flex items-start gap-4 p-6">
                <f.icon className="h-5 w-5 text-emerald-600" />
                <div>
                  <div className="font-semibold">{f.title}</div>
                  <div className="text-sm text-muted-foreground">{f.desc}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="container mx-auto grid gap-6 px-4 py-12 md:grid-cols-3">
        {[
          {
            step: 1,
            title: 'Step 1: A1 & A2',
            desc: '<25% fail (no retake), 25–49.99% A1, 50–74.99% A2, ≥75% A2 + Step 2.',
          },
          {
            step: 2,
            title: 'Step 2: B1 & B2',
            desc: '<25% A2, 25–49.99% B1, 50–74.99% B2, ≥75% B2 + Step 3.',
          },
          {
            step: 3,
            title: 'Step 3: C1 & C2',
            desc: '<25% B2, 25–49.99% C1, ≥50% C2.',
          },
        ].map((s) => (
          <Card key={s.step} className="border-0 shadow-sm">
            <CardContent className="space-y-2 p-6">
              <div className="text-xs font-medium text-emerald-700">{`Step ${s.step}`}</div>
              <div className="text-lg font-semibold">{s.title}</div>
              <div className="text-sm text-muted-foreground">{s.desc}</div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-b from-white to-emerald-50 py-16">
        <div className="container mx-auto grid items-center gap-8 px-4 md:grid-cols-2">
          <div className="relative mx-auto aspect-video w-full max-w-xl overflow-hidden rounded-xl border bg-muted">
            <img
              src="/placeholder.svg?height=600&width=1000"
              alt="Analytics preview"
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">
              {'Ready to certify your skills?'}
            </h2>
            <p className="text-muted-foreground">
              {
                'Create your account, verify email via OTP, and start your assessment in minutes.'
              }
            </p>
            <div className="flex gap-3">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link to="/auth/register">{'Create Account'}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/auth/login">{'Login'}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
