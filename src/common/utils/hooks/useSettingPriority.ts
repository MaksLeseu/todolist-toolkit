import {useState} from "react";
import {Nullable} from "../types/optional.types";

export const useSettingPriority = () => {
    const [priority, setPriority] = useState<Nullable<number>>(null)

    const settingPriority = (priority: number) => setPriority(priority)
    const resetPriority = () => setPriority(null)

    return {priority, settingPriority, resetPriority}
}