import {useState} from "react";

export const useSettingPriority = () => {
    const [priority, setPriority] = useState<number>(1)

    const settingPriority = (priority: number) => setPriority(priority)
    const resetPriority = () => setPriority(1)

    return {priority, settingPriority, resetPriority}
}