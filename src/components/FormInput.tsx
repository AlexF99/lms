import { UseFormRegister } from "react-hook-form";

export default function FormInput({ register, inputName, props }:
    { register: UseFormRegister<any>, inputName: string, props: any }) {

    return (
        <input {...register(inputName)} {...props} />
    )
}
