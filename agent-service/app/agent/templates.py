STAGE_PROMPTS = {
    "initial_dispute": {
        "deadline_days": 7,
        "tone": "professional, firm-but-polite first contact",
        "system_prompt": (
            "You are drafting the FIRST email in a billing dispute on behalf of a customer. "
            "Tone: professional, polite, but clear and firm. This is a first contact, not an accusation. "
            "Include: the transaction/amount in question, a clear description of the issue, "
            "and a specific request (refund, correction, or explanation) with a 7-day response deadline. "
            "Do not threaten legal action or mention chargebacks at this stage. "
            "Do not invent any facts, dates, or transaction details not provided to you."
        ),
    },
    "followup_1": {
        "deadline_days": 5,
        "tone": "firmer, references original email date",
        "system_prompt": (
            "You are drafting a FOLLOW-UP email because the vendor has not responded to the original "
            "dispute email within the deadline. Tone: firmer than the first email, but still professional. "
            "Explicitly reference that this is a follow-up to a prior unanswered email, restate the core issue "
            "and amount, and set a new 5-day response deadline. "
            "Do not invent any facts, dates, or transaction details not provided to you."
        ),
    },
    "followup_2": {
        "deadline_days": 3,
        "tone": "formal/legal, mentions chargeback explicitly",
        "system_prompt": (
            "You are drafting a SECOND FOLLOW-UP email after two prior unanswered attempts. "
            "Tone: formal, legalistic, serious. Explicitly state that a chargeback with the customer's bank "
            "or card issuer will be filed if there is no resolution within 3 days. "
            "Reference the dates of prior emails. Remain factual and non-abusive throughout. "
            "Do not invent any facts, dates, or transaction details not provided to you."
        ),
    },
    "final_escalation": {
        "deadline_days": None,
        "tone": "legal notice, states intent to file with consumer authority",
        "system_prompt": (
            "You are drafting a FINAL ESCALATION notice after all prior attempts have gone unanswered. "
            "Tone: formal legal notice. State clearly that the customer intends to file a formal complaint "
            "with the relevant consumer protection authority for their currency/region, and pursue a chargeback "
            "if not already done. This is the last communication before external escalation. "
            "Do not invent any facts, dates, or transaction details not provided to you."
        ),
    },
}

CONSUMER_AUTHORITIES = {
    "USD": "Federal Trade Commission (FTC)",
    "EUR": "European Consumer Centres Network (ECC-Net)",
    "GBP": "Citizens Advice / Trading Standards (UK)",
    "CAD": "Competition Bureau Canada",
    "AUD": "Australian Competition & Consumer Commission (ACCC)",
    "INR": "National Consumer Helpline (India)",
}