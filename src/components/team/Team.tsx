import React from 'react';
import { TeamData } from '../interface/team';
import { TeamMessageEnum } from '../teams/enum/team.message.enum';

const TeamComponent: React.FC<TeamData> = ({ teamData, teamLoaded }) => {
    const noTeamsSelected = TeamMessageEnum.noTeamsSelected;

    return (
        <>
            <h2>Selected Team:</h2>

            {teamLoaded ?
                <div className="block selection-made">
                    <strong>{teamData?.id}</strong> - {teamData?.name}
                </div> : <span className="block no-selection">{noTeamsSelected}</span>
            }
        </>
    )
}
export default TeamComponent;