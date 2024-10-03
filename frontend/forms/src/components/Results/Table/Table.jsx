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
            <div className="result-header">
                {name}
            </div>
            {table}
        </>
    )
}

export default Table;