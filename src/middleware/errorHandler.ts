import type { Request, Response, NextFunction } from "express";

export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void {
    
    if (err instanceof SyntaxError && "body" in err) {
        res.status(400).json({ error: "malformed JSON" });
        return;
    }

    res.status(500).json({ error: "Internal Server Error" });
}