"use client";

import { GithubIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function GithubInstallButton() {
  return (
    <div className="mt-4 border py-4">
      <p>You must install plugin to stare building projects</p>
      <Button 
        variant="secondary"
        className="border py-2 px-3 mt-4" 
        onClick={async () => {
        window.location.href = `https://github.com/apps/${process.env.GITHUB_APP_NAME}/installations/new`;
        }}>
          <div className="flex items-center gap-2">
            <GithubIcon />
            <span>Install Plugin</span>
          </div>
        </Button>
    </div>
  )
}