import { Injectable } from '@nestjs/common';
import OpenAI from "openai";
import { ConfigService } from '@nestjs/config';
import { Env } from 'src/env.model';

@Injectable()
export class OpenaiService {
    private openai: OpenAI;
    constructor(
        private configService: ConfigService<Env>
    ) {

        const apiKey = this.configService.get('OPENAI_API_KEY');
        if (!apiKey) {
            throw new Error('OPENAI_API_KEY is not defined in the environment variables');
        }

        this.openai = new OpenAI({
            apiKey
        });
    }

    async generateSummary(content: string): Promise<string> {
        try {
        const response = await this.openai.responses.create({
            model: "gpt-4o-mini",
            instructions: `You are a helpful assistant that summarizes content. Please provide a concise summary
            with 255 characters or less, ensuring that the summary is clear and informative about the main points
            of the following content:\n\n${content}`,
            input: content,
            max_output_tokens: 150,
        });

        return response.output_text || "No summary could be generated.";
        } catch (error) {
            console.error("Error generating summary:", error);
            throw new Error("Failed to generate summary.");
        }
    }

    async generateImage(prompt: string): Promise<string> {
        const response = await this.openai.images.generate({
            model: "dall-e-3",
            prompt
        });

        if(!response.data || response.data.length === 0) {
            throw new Error("No image could be generated.");
        }

        return response.data[0].url || "No image URL could be generated.";
    }

}
