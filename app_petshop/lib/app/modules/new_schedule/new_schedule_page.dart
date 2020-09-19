import 'package:flutter/material.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'new_schedule_controller.dart';

class NewSchedulePage extends StatefulWidget {
  final String title;
  const NewSchedulePage({Key key, this.title = "NewSchedule"})
      : super(key: key);

  @override
  _NewSchedulePageState createState() => _NewSchedulePageState();
}

class _NewSchedulePageState
    extends ModularState<NewSchedulePage, NewScheduleController> {
  //use 'controller' variable to access controller

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Column(
        children: <Widget>[],
      ),
    );
  }
}
