import { useState } from 'react'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const StatisticLine = (props) => {
    if(props.header === "Positive"){
        return(
            <tr>
                <td>
                    {props.header}
                </td> 
                <td>
                    {props.value}%
                </td>
            </tr>
        )
    }else{
        return(
            <tr>
                <td>
                    {props.header}
                </td> 
                <td>
                    {props.value}
                </td>
            </tr>
        )
    }
    
}

const Statistics = ({good,bad,neutral}) => {
    const all = good+neutral+bad;
    const average = (good-bad)/(all);
    const pos_percantage = (good*100)/(all)
    if(all === 0){
        return(
            <div>
                <p>No feedback given</p>
            </div>
        );
    }else{
        return(
            <div>
                <table>
                    <tbody>
                        <StatisticLine header="Good" value={good}/>
                        <StatisticLine header="Neutral" value={neutral}/>
                        <StatisticLine header="Bad" value={bad}/>
                        <StatisticLine header="All" value={all}/>
                        <StatisticLine header="Average" value={average}/>
                        <StatisticLine header="Positive" value={pos_percantage}/>
                    </tbody>
                </table>
            </div>
        );
    }
    
}

const App = () => {

    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={() => setGood(good+1)} text="Good"/>
            <Button handleClick={() => setNeutral(neutral+1)} text="Neutral"/>
            <Button handleClick={() => setBad(bad+1)} text="Bad"/>
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )

}

export default App;
