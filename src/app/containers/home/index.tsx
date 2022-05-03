import React, { Component } from "react";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { APP_INIT_WEBSOCKET } from "../../redux/socket/constants";
import { Button, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import { ws } from "../../services/ws_service";
import AppLevelModal from "../../components/AppLevelModal";
import GameBoard from "../../components/GameBoard";

class Home extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      visibleLevelModal: false,
    };
  }

  componentDidMount() {
    const { initAppService } = this.props;
    initAppService();
  }

  render() {
    console.log(this.props);
    const { isConnected, isStarted, initAppService } = this.props;
    const { visibleLevelModal } = this.state;

    return (
      <div className="vh-100 vw-100 d-flex align-items-center justify-content-center flex-column">
        <Button
          variant="contained"
          disabled={isConnected}
          onClick={() => initAppService()}
        >
          Connect
        </Button>
        <Button
          variant="contained"
          disabled={!isConnected}
          className="mt-3"
          onClick={() => this.setState({ visibleLevelModal: true })}
        >
          New Game
        </Button>

        <GameBoard />

        <AppLevelModal
          isOpen={visibleLevelModal}
          onClose={() => this.setState({ visibleLevelModal: false })}
        />
      </div>
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  isConnected: state.service.isConnected,
  isStarted: state.service.isStarted,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  initAppService: () =>
    dispatch({
      type: APP_INIT_WEBSOCKET,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
