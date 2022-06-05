import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {decrement, increment, incrementByAmount, selectCount} from "../../redux/slices/counterSlice";
import {useSelector} from "react-redux";


const CounterPage = () => {
    const count = useSelector(selectCount)
    const dispatch = useAppDispatch()


    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(incrementByAmount(5))}
                >
                    Increment 5
                </button>
            </div>
        </div>
    )
}

export default CounterPage