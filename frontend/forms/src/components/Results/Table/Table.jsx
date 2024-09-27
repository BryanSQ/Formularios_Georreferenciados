import TextTable from "./tables/TextTable";
import ListTable from "./tables/ListTable";
import MapTable from "./tables/MapTable";

const Table = ({ name, type, answers }) => {

    let table;
    if(type === 1 || type === 2) {
        table = <TextTable answers={answers} />
    }
    else if(type === 3 || type === 4) {
        table = <ListTable answers={answers} />
    }
    else{
        table = <MapTable answers={answers} />
    }

    return (
        <>
            <b>{name}</b>
            {table}
        </>
    )
}

export default Table;