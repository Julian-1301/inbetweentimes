import { html, LitElement, TemplateResult, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { GameObjectFormResult } from "../../../shared/GameObjectFormResult";
import { addGameObject } from "../services/routeService";
 
@customElement("success-span")
export class SuccessSpan extends LitElement {
    @property({ type: Boolean }) public success = false;
 
    public static styles = css`
        .success {
            color: green;
        }
        .failure {
            color: red;
        }
    `;
 
    public render(): TemplateResult {
        return this.success
            ? html`<span class="success">Successful</span>`
            : html`<span class="failure">Unsuccessful</span>`;
    }
}
 
@customElement("text-input")
export class TextInput extends LitElement {
    @property({ type: String }) private label = "";
    @property({ type: String }) private value = "";
 
    public render(): TemplateResult {
        return html`
            <label>${this.label}</label>
            <input type="text" .value="${this.value}" @input="${this.handleInput}" />
        `;
    }
 
    private handleInput(event: Event): void {
        this.dispatchEvent(
            new CustomEvent("input-changed", { detail: (event.target as HTMLInputElement).value })
        );
    }
}
 
@customElement("number-input")
export class NumberInput extends LitElement {
    @property({ type: String }) private label = "";
    @property({ type: Number }) private value?: number;
    @property({ type: Boolean }) private roundValue = false;
 
    public render(): TemplateResult {
        let roundedValue: string = "";
        const stepValue: number = this.roundValue ? 1 : 0.01;
        if (this.value !== undefined) {
            roundedValue = this.roundValue ? Math.round(this.value).toString() : this.value.toString();
        }
        return html`
            <label>${this.label}</label>
            <input
                type="number"
                step="${stepValue}"
                min="0"
                .value="${roundedValue}"
                @input="${this.handleInput}"
            />
        `;
    }
 
    private handleInput(event: Event): void {
        const inputElement: HTMLInputElement = event.target as HTMLInputElement;
        const inputValue: string = inputElement.value;
 
        let newValue: number | undefined;
        if (inputValue === "") {
            newValue = undefined;
        } else {
            newValue = parseFloat(inputValue);
        }
 
        this.value = newValue;
        this.dispatchEvent(new CustomEvent("input-changed", { detail: newValue }));
    }
}
 
@customElement("textarea-input")
export class TextAreaInput extends LitElement {
    @property({ type: String }) private label = "";
    @property({ type: String }) private value = "";
 
    public render(): TemplateResult {
        return html`
            <label>${this.label}</label>
            <textarea .value="${this.value}" @input="${this.handleInput}"></textarea>
        `;
    }
 
    private handleInput(event: Event): void {
        const textarea: any = event.target as HTMLTextAreaElement;
        this.value = textarea.value;
        this.dispatchEvent(new CustomEvent("input-changed", { detail: this.value }));
    }
}
 
@customElement("gameobject-form")
export class GameObjectForm extends LitElement {
    @property({ type: String }) public selectedType = "item";
    @property({ type: Object }) public formData: GameObjectFormResult = {
        alias: "",
        name: "",
        description: "",
        type: "item",
    };
    @property({ type: Boolean }) private clickEventFired = false;
    @property({ type: Boolean }) private success = false;
 
    public render(): TemplateResult<1> {
        return html`
            ${this.clickEventFired ? html`<success-span .success="${this.success}"></success-span>` : ""}
            <text-input
                label="Alias"
                .value="${this.formData.alias}"
                @input-changed="${(e: any): void => (this.formData.alias = e.detail)}"
            ></text-input>
            <text-input
                label="Name"
                .value="${this.formData.name}"
                @input-changed="${(e: any): void => (this.formData.name = e.detail)}"
            ></text-input>
            <textarea-input
                label="Description"
                .value="${this.formData.description}"
                @input-changed="${(e: any): void => (this.formData.description = e.detail)}"
            ></textarea-input>
            <label>Type</label>
            <select @change="${this.handleTypeChange}" .value="${this.selectedType}">
                <option value="item">Item</option>
                <option value="room">Room</option>
                <option value="character">Character</option>
            </select>
 
            ${this.selectedType === "item"
                ? html`<number-input
                      label="Price"
                      .value="${this.formData.price || 0}"
                      @input-changed="${(e: any): void => (this.formData.price = e.detail)}"
                  ></number-input>`
                : ""}
            ${this.selectedType === "character"
                ? html`<number-input
                      label="HP"
                      .value="${this.formData.hp || 0}"
                      roundValue="true"
                      @input-changed="${(e: any): void => (this.formData.hp = e.detail)}"
                  ></number-input>`
                : ""}
            <button @click="${this.clickEvent}">Add ${this.selectedType}</button>
        `;
    }
 
    private handleTypeChange(event: Event): void {
        const newType: string = (event.target as HTMLSelectElement).value;
        this.selectedType = newType;
        this.formData.type = newType;
 
        if (this.selectedType !== "item") {
            this.formData.price = undefined;
        }
 
        if (this.selectedType !== "character") {
            this.formData.hp = undefined;
        }
    }
 
    private async clickEvent(): Promise<void> {
        try {
            console.log("Form Data:", this.formData);
            const success: boolean = await addGameObject(this.formData);
            console.log(success ? "Successfully added!" : "Failed to add!");
            this.clickEventFired = true;
            this.success = success;
        } catch (error) {
            console.error("Error adding game object:", error);
        }
    }
}