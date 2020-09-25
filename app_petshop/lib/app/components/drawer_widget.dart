import 'package:app_petshop/app/modules/container/container_controller.dart';
import 'package:flutter/material.dart';
import 'package:flutter_modular/flutter_modular.dart';

class DrawerWidget extends StatefulWidget {
  @override
  _DrawerWidgetState createState() => new _DrawerWidgetState();
}

class _DrawerWidgetState extends State<DrawerWidget> {

 final containerController = Modular.get<ContainerController>();

//Cria uma listview com os itens do menu
Widget _listMenu() {
    return ListView(
      children: <Widget>[
        _avatar(),
        _tiles("Início", Icons.home, 1, () {
          containerController.onTapMenu(1, 'Home');
        }),
        _tiles("Servicos", Icons.list, 2, () {
          containerController.onTapMenu(2, 'Services');
        }),
        _tiles("Configuracoes", Icons.settings, 3, () {
          containerController.onTapMenu(3, 'Configurations');
        }),
        _tiles("Notificacoes", Icons.notifications, 4, () {;
          containerController.onTapMenu(4, 'Notifications');
        }),
        _tiles("Sobre", Icons.info, 5, () {
          containerController.onTapMenu(5, 'About');
        }),
        Divider(),
        _tiles("SAIR", Icons.exit_to_app, 6, () {
          
        }),
       
      ],
    );
  }

//cria cada item do menu
  Widget _tiles(String text, IconData icon, int item, Function onTap) {
    bool _isSelected = item == containerController.currentindex;
    Color _currentColor = _isSelected ? Colors.white : Colors.black;
    return ListTile(
      leading: Icon(icon, color: _currentColor),
      onTap: onTap,
      selected: _isSelected,
          title: Text(
            text,
            style: TextStyle(fontWeight: FontWeight.bold, color: _currentColor),
          ),
        );
  }

  @override
  Widget build(BuildContext context) {
    return Material(
          child: Container(
              width: double.infinity,
              height: double.infinity,
              color: Theme.of(context).colorScheme.secondaryVariant,
              child: _listMenu()),
    );
  }

  //cria o avatar com nome, email e imagem
  Widget _avatar() {
    return Padding(
      padding: EdgeInsets.all(18.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          CircleAvatar(
            backgroundColor: Colors.white,
            child: Text('TB'),
          ),
          Container(height: 12.0,),
          Text("Thiago Bardez", style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold, color: Colors.white),),
          Text("bardez@gmail.com", style: TextStyle(color: Colors.white)),
        ],
      ),
    );
  }
}