export default function Conditional({ children, Condition } : { children?: React.ReactNode, Condition: boolean }): JSX.Element
{
    if (Condition)
        return <>{children}</>;

    return <></>;
}