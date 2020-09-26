import 'package:app_petshop/app/modules/container/container_controller.dart';
import 'package:flutter/material.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'configurations_controller.dart';

class ConfigurationsPage extends StatefulWidget {
  final String title;
  const ConfigurationsPage({Key key, this.title = "Configuracoes"})
      : super(key: key);

  @override
  _ConfigurationsPageState createState() => _ConfigurationsPageState();
}

class _ConfigurationsPageState
    extends ModularState<ConfigurationsPage, ConfigurationsController> {
  //use 'controller' variable to access controller

List<dynamic> inputs;
final containerController = Modular.get<ContainerController>();

@override
void initState() {
  inputs = new List<dynamic>();
  setState(() {
    inputs.add({'text': 'Domingo','value': false});
    inputs.add({'text': 'Segunda-feira' ,'value': false});
    inputs.add({'text': 'Terca-feira' ,'value': false});
    inputs.add({'text': 'Quarta-feira' ,'value': false});
    inputs.add({'text': 'Quinta-feira' ,'value': false});
    inputs.add({'text': 'Sexta-feira' ,'value': false});
    inputs.add({'text': 'Sábado', 'value': false});
  });
}
 
void ItemChange(bool val,int index){
  print(val);
  setState(() {
    inputs[index]['value'] = val;
  });
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        leading: GestureDetector(
          onTap: containerController.toggleMenu,
          child: Icon(Icons.menu)),
      ),
      body: SingleChildScrollView(
        child: Column( children: [ 
          Padding(
            child: Text(
              'Disponibilidade',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold
              ),
            ),
            padding: EdgeInsets.all(10),
          ),
          Padding(
            padding: EdgeInsets.all(10),
            child:TextField(
            decoration: InputDecoration(
              hintText: 'Hora de Início'
            ),
          )),
          Padding(
            padding: EdgeInsets.all(10),
            child:TextField(
            decoration: InputDecoration(
              hintText: 'Iníco do Intervalo'
            ),
          )),
          Padding(
            padding: EdgeInsets.all(10),
            child:TextField(
            decoration: InputDecoration(
              hintText: 'Fim do Intervalo'
            ),
          )),
          Padding(
            padding: EdgeInsets.all(10),
            child:TextField(
            decoration: InputDecoration(
              hintText: 'Hora final'
            ),
          )),
          Column(
            children: inputs.length > 0 ?_getDaysOfWeek() : [Container()]
          ),
        ]
      )
      ),
      floatingActionButton: FloatingActionButton(
            heroTag: 'cfg_tag',
            onPressed: () => Modular.to.pop(),
            child: Icon(Icons.save, color: Theme.of(context).floatingActionButtonTheme.foregroundColor,),
            foregroundColor: Theme.of(context).floatingActionButtonTheme.foregroundColor,
          )   
    );
  }

  List<Widget> _getDaysOfWeek() {
    return this.inputs.asMap().entries.map((e){
      return Card(
                  child: new Container(
                    // padding: new EdgeInsets.all(5.0),
                    child: new Column(
                      children: <Widget>[
                        new CheckboxListTile(
                            value: e.value['value'],
                            title: new Text(e.value['text']),
                            controlAffinity: ListTileControlAffinity.leading,
                            onChanged:(bool val) => ItemChange(val, e.key)
                        )
                      ],
                    ),
                  ),
                );
    }).toList();
  }
}
