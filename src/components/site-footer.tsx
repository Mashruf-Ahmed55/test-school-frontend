'use client';

import { Link } from 'react-router';

export default function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto grid gap-6 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="font-semibold">{`Test_School`}</div>
          <div className="mt-2 text-sm text-muted-foreground">
            {'Secure multi-stage digital competency assessments (A1–C2).'}
          </div>
        </div>
        <div className="text-sm">
          <div className="font-medium mb-2">{'Product'}</div>
          <ul className="space-y-1 text-muted-foreground">
            <li>
              <Link className="hover:underline" to="/exam/start">
                {'Start Exam'}
              </Link>
            </li>
            <li>
              <Link className="hover:underline" to="/dashboard">
                {'Dashboard'}
              </Link>
            </li>
            <li>
              <Link className="hover:underline" to="/admin/dashboard">
                {'Admin'}
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="font-medium mb-2">{'Company'}</div>
          <ul className="space-y-1 text-muted-foreground">
            <li>
              <Link className="hover:underline" to="/#features">
                {'Features'}
              </Link>
            </li>
            <li>
              <Link className="hover:underline" to="/#faq">
                {'FAQ'}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        {'© '} {new Date().getFullYear()} {' Test_School. All rights reserved.'}
      </div>
    </footer>
  );
}
