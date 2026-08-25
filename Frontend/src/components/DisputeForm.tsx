"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";
import type { Currency } from "@/lib/types";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface DisputeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}

const CURRENCIES: Currency[] = ["USD", "EUR", "GBP", "INR", "BRL", "AUD"];

export function DisputeForm({
  open,
  onOpenChange,
  onCreated,
}: DisputeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vendorName, setVendorName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [evidenceDescription, setEvidenceDescription] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  function resetForm() {
    setVendorName("");
    setContactEmail("");
    setIssueDescription("");
    setAmount("");
    setCurrency("USD");
    setEvidenceDescription("");
    setAccountNumber("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!vendorName.trim() || !contactEmail.trim() || !issueDescription.trim() || !amount) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.disputes.create({
        vendor_name: vendorName.trim(),
        contact_email: contactEmail.trim(),
        issue_description: issueDescription.trim(),
        amount: parseFloat(amount),
        currency,
        evidence_description: evidenceDescription.trim() || undefined,
        account_number: accountNumber.trim() || undefined,
      });
      toast.success("Dispute created successfully.");
      resetForm();
      onOpenChange(false);
      onCreated();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create dispute."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Dispute</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vendorName">
              Vendor Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="vendorName"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              placeholder="e.g. Acme Corp"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactEmail">
              Contact Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contactEmail"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="billing@vendor.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="issueDescription">
              Issue Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="issueDescription"
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              placeholder="Describe the billing issue…"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">
                Amount <span className="text-destructive">*</span>
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={currency}
                onValueChange={(v) => setCurrency(v as Currency)}
              >
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="evidenceDescription">Evidence Description</Label>
            <Textarea
              id="evidenceDescription"
              value={evidenceDescription}
              onChange={(e) => setEvidenceDescription(e.target.value)}
              placeholder="Any supporting evidence or documentation…"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Optional account/reference number"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Dispute
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
