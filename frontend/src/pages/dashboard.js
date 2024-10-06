import { useState } from "react";
import DashboardNav from "../partials/dashboardNav";
import Searchbar from "../partials/searchbar";
import DashboardCanvas from '../partials/components/dashboardCanvas';
import MobileFooter from '../partials/mobileFooter';
import CodingDashboardBlock from '../partials/components/codingDashboardBlock';
import MathDashboardBlock from '../partials/components/mathDashboardBlock';
import ScienceDashboardBlock from '../partials/components/scienceDashboardBlock';
import FinanceDashboardBlock from "../partials/components/financeDashboardBlock";
import LawDashboardBlock from "../partials/components/lawDashboardBlock";
import EngineerDashboardBlock from "../partials/components/engineerDashboardBlock";


function Dashboard() {
    return (
        <div className="mainContainer dashboardContainer">
            <DashboardNav />
            <Searchbar />
            <div className="dashboardContent">
                <h1 className="dashboardTitle">Dashboard</h1>
                <DashboardCanvas>
                    <p className="dashboardInstructions">Choose a category and start
                        Jotting your thoughts
                    </p>
                    <div className="blockContainer">
                        <CodingDashboardBlock />
                        <MathDashboardBlock />
                        <ScienceDashboardBlock />
                        <FinanceDashboardBlock />
                        <LawDashboardBlock />
                        <EngineerDashboardBlock />
                    </div>
                </DashboardCanvas>
            </div>
            <MobileFooter />
        </div>
    )
}

export default Dashboard;
