import React, {FC} from 'react';

type Props = {
    styles?: { width: number, height: number }
}

export const MenuDownIcon: FC<Props> = (props) => {
    const {styles} = props

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={styles ? styles.width : 24} height={styles ? styles.height : 24}
             viewBox="0 0 24 24" fill="none">
            <path d="M7 10L12 15L17 10H7Z" fill="#704ECC"/>
        </svg>
    );
};