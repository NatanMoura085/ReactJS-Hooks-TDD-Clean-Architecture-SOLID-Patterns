import { Validation } from "@/presentetion/protocols/validation"

export class ValidationStub implements Validation {
    errorMessage: string
    input: object
  
    validate(fieldName: string, fieldValue: string): string {
    
        return this.errorMessage
    }
}