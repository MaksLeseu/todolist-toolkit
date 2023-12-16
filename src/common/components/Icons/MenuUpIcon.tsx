import React, {FC} from 'react';

type Props = {
    styles?: { width: number, height: number }
}

export const MenuUpIcon: FC<Props> = (props) => {
    const {styles} = props

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={styles ? styles.width : 24} height={styles ? styles.height : 24}
             viewBox="0 0 16 16" fill="none">
            <path d="M11.334 9.33325L8.00065 5.99992L4.66732 9.33325L11.334 9.33325Z" fill="#EFE3FF"/>
        </svg>
    );
};