class PassengerBehaviour {
    constructor(passenger, aisleColumn) {
        this.p = passenger;
        this.aisleColumn = aisleColumn;
    }

    update() {
        throw new Error("Undefined method: PassengerBehaviour child class must contain update() method");
    }

    tryMoveInDirection(interval, passengers, dir) {
        const canMove = this.getCanMoveInDirection(passengers, dir);
        if (canMove) {
            this.p.moveInDirection(interval, dir);
        }
    }

    getIsClearPath(passengers, dir) {
        const axis = this.#getAxis(dir);
        const isMovingForward = this.#getIsMovingForward(dir);
        for (const otherP of passengers) {
            if (this.#getIsInWay(otherP, isMovingForward, axis)) {
                return false;
            }
        }
        return true;
    }

    getCanMoveInDirection(passengers, dir) {
        const axis = this.#getAxis(dir);
        if (axis == 'y') return true;
        return this.getIsClearPath(passengers, dir);
    }

    #getAxis(dir) {
        if (dir.y) return 'y';
        return 'x';
    }

    #getIsMovingForward(dir) {
        if (dir.x < 0 || dir.y < 0) return false;
        return true;
    }

    #getIsInWay(otherP, isMovingForward, axis) {
        const inWayAlongX = this.#getIsInWayAlongX(otherP, isMovingForward);
        const inWayAlongY = this.#getIsInWayAlongY(otherP, isMovingForward);
        const onSameAxis = this.#getIsOnSameAxis(otherP, axis);
        if (!onSameAxis) return false;
        if (axis == 'x' && inWayAlongX) return true;
        if (axis == 'y' && inWayAlongY) return true;
        return false;
    }

    #getIsInWayAlongX(otherP, isMovingForward) {
        let infront, tooClose;
        if (isMovingForward) {
            infront = otherP.position.x > this.p.position.x;
            tooClose = otherP.position.x < this.p.position.x + 1;
        } else {
            infront = otherP.position.x < this.p.position.x;
            tooClose = otherP.position.x > this.p.position.x - 1;
        }
        return (infront && tooClose);
    }

    #getIsInWayAlongY(otherP, isMovingForward) {
        let infront, tooClose;
        if (isMovingForward) {
            infront = otherP.position.y < this.p.position.y;
            tooClose = otherP.position.y > this.p.position.y - 1;
        } else {
            infront = otherP.position.y > this.p.position.y;
            tooClose = otherP.position.y < this.p.position.y + 1;
        }
        return (infront && tooClose);
    }

    #getIsOnSameAxis(otherP, axis) {
        if (axis == 'x') {
            return otherP.getIsInColumn(this.p.position.y);
        }
        return otherP.getIsInRow(this.p.position.x);
    }
}


export default PassengerBehaviour;
