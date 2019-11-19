class AppNumbers {
  private nombres: Array<number> = [];

  ajoute = (nombre: number) => this.nombres.push(nombre);
  somme = () => this.nombres.reduce((p, n) => p + n);
}

export default AppNumbers;
