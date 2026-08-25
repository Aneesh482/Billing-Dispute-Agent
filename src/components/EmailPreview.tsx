"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Pencil, Mail, Loader2 } from "lucide-react";
import type { GeneratedEmail } from "@/lib/types";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface EmailPreviewProps {
  disputeId: string;
  email: GeneratedEmail;
  onSent: () => void;
}

export function EmailPreview({ disputeId, email, onSent }: EmailPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [subject, setSubject] = useState(email.subject);
  const [body, setBody] = useState(email.body);
  const [isSending, setIsSending] = useState(false);

  async function handleSend() {
    setIsSending(true);
    try {
      await api.disputes.sendEmail(disputeId, { subject, body });
      toast.success("Email sent successfully.");
      onSent();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send email.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Generated Email</CardTitle>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-3 w-3" /> Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="email-subject">Subject</Label>
              <Input
                id="email-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-body">Body</Label>
              <Textarea
                id="email-body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Email body"
                rows={12}
                className="font-mono text-sm"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSend} disabled={isSending} className="gap-2">
                {isSending && <Loader2 className="h-4 w-4 animate-spin" />}
                <Mail className="h-4 w-4" /> Send Email
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSubject(email.subject);
                  setBody(email.body);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Subject</p>
              <p className="mt-1 font-medium">{subject}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Body</p>
              <div
                className="prose prose-sm mt-2 max-w-none rounded-lg border bg-muted/30 p-4"
                dangerouslySetInnerHTML={{
                  __html: body.replace(/\n/g, "<br />"),
                }}
              />
            </div>
            <Button onClick={handleSend} disabled={isSending} className="gap-2">
              {isSending && <Loader2 className="h-4 w-4 animate-spin" />}
              <Mail className="h-4 w-4" /> Send Email
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
